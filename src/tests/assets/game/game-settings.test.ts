import { settings } from "db://assets/game/scripts/game-settings";

describe("Game Settings", () => {
    describe("settings object", () => {
        test("should have correct basic properties", () => {
            expect(settings).toBeDefined();
            expect(settings.id).toBe(55);
            expect(settings.name).toBe("UnbalancedBigSmall4");
            expect(settings.observerNamespace).toBe("UnbalancedBigSmall4");
            expect(settings.isMiniGame).toBe(true);
            expect(settings.numberOfRoundHistory).toBe(100);
        });

        test("should have correct namespaces", () => {
            expect(settings.namespaces).toEqual(["UnbalancedBigSmall4", "BigSmall"]);
            expect(settings.namespaces).toHaveLength(2);
        });

        test("should have correct durations configuration", () => {
            expect(settings.durations).toBeDefined();
            expect(typeof settings.durations).toBe("object");

            // Test individual duration values
            expect(settings.durations.wholeRound).toBe(40);
            expect(settings.durations.lockingBet).toBe(5);
            expect(settings.durations.placingBet).toBe(30);
            expect(settings.durations.generatingResult).toBe(3);
            expect(settings.durations.showingResult).toBe(4);
            expect(settings.durations.startRound).toBe(3);
        });

        test("should have durations that sum to expected total", () => {
            const { durations } = settings;
            const totalDuration =
                durations.lockingBet + durations.placingBet + durations.generatingResult + durations.showingResult + durations.startRound;

            // Verify the sum of individual components
            expect(totalDuration).toBe(45);
            // The wholeRound might be shorter than sum of components due to overlapping phases
            expect(durations.wholeRound).toBe(40);
        });

        test("should have all required properties", () => {
            const requiredProperties = ["id", "name", "observerNamespace", "namespaces", "durations", "numberOfRoundHistory", "isMiniGame"];

            requiredProperties.forEach((prop) => {
                expect(settings).toHaveProperty(prop);
            });
        });

        test("should have consistent naming", () => {
            expect(settings.name).toBe(settings.observerNamespace);
            expect(settings.namespaces).toContain(settings.name);
        });
    });

    describe("durations validation", () => {
        test("should have positive duration values", () => {
            const { durations } = settings;

            Object.values(durations).forEach((duration) => {
                expect(duration).toBeGreaterThan(0);
                expect(typeof duration).toBe("number");
            });
        });

        test("should have reasonable duration ranges", () => {
            const { durations } = settings;

            // Test that durations are within reasonable bounds
            expect(durations.wholeRound).toBeGreaterThan(30);
            expect(durations.wholeRound).toBeLessThan(60);
            expect(durations.placingBet).toBeGreaterThan(durations.lockingBet);
            expect(durations.generatingResult).toBeGreaterThan(0);
            expect(durations.showingResult).toBeGreaterThan(0);
            expect(durations.startRound).toBeGreaterThan(0);
        });
    });

    describe("type validation", () => {
        test("should have correct data types", () => {
            expect(typeof settings.id).toBe("number");
            expect(typeof settings.name).toBe("string");
            expect(typeof settings.observerNamespace).toBe("string");
            expect(Array.isArray(settings.namespaces)).toBe(true);
            expect(typeof settings.durations).toBe("object");
            expect(typeof settings.numberOfRoundHistory).toBe("number");
            expect(typeof settings.isMiniGame).toBe("boolean");
        });
    });
});
