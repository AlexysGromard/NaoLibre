import * as assert from "assert";
import ModelAvis from "../src/model/ModelAvis.mjs";


describe('ModelAvis', () => {
    describe('moyenne', () => {
        it('devrait retourner la moyenne des avis', () => {
            const avis = new ModelAvis({nomLigne:"11", avis: [{ note: 5 }, { note: 10 }] });
            assert.strictEqual(avis.moyenne(), 7.5);
        });

        it('devrait retourner null si aucun avis n\'est disponible', () => {
            const avis = new ModelAvis({nomLigne:"11", avis: [] });
            assert.strictEqual(avis.moyenne(), null);
        });

    });

    describe("ModelAvis constructor", () => {
        it("should throw an error for missing required properties", () => {
            assert.throws(() => new ModelAvis({}),Error("Invalid object type"))
            assert.throws(() => new ModelAvis({ nomLigne: "test" }),Error("Invalid object type"))
            assert.throws(() => new ModelAvis({ avis: [] }),Error("Invalid object type"))
        });

        it("should throw an error for non-array properties", () => {
            assert.throws(() => new ModelAvis({ nomLigne: "test", avis: "not an array" }),Error("Object attributes are not array"))
            assert.throws(() => new ModelAvis({ nomLigne: [], avis: [] }),Error("Object attributes are not array"))
        });
    });

});


describe("ModelAvis moyenneOftheHoures", () =>{

    it('should return array of 24 null',  () => {
        const avis = new ModelAvis({nomLigne: "test", avis: []});
        const result = avis.moyenneOftheHoures(new Date())
        assert.strictEqual(result[0],null)
        assert.strictEqual(result.length,24)
    });
})

describe("ModelAvis.moyenneOftheHouresManyList", () => {

    it("should throw an error for non-Date parameter", () => {
        const avis = new ModelAvis({nomLigne: "test", avis: []});
        assert.throws(() => {
            avis.moyenneOftheHoures("invalid");
        }, Error( "date is not a Date"));
    });

    it("should return an array of 24 elements with sums and counts for empty data", () => {
        const avis = new ModelAvis({ nomLigne: "test", avis: [] });
        const result = ModelAvis.moyenneOftheHouresofManyList(new Date(),[]);
        assert.strictEqual(result.length,24);
        result.forEach((moy) => {
            assert.deepEqual(moy,0);
        });
    });

    it("should calculate hourly averages for reviews on the same date", () => {
        const avis = new ModelAvis({
            nomLigne: "test",
            avis: [
                { date: "2024-04-09T08:00:00", note: 3 },
                { date: "2024-04-09T08:00:00", note: 3 },
                { date: "2024-04-09T10:30:00", note: 4 },
                { date: "2024-04-08T15:00:00", note: 2 }, // Different date
            ],
        });
        const avis2 = new ModelAvis({
            nomLigne: "test2",
            avis: [
                { date: "2024-04-09T08:00:00", note: 3 },
                { date: "2024-04-09T08:00:00", note: 3 },
                { date: "2024-04-09T10:30:00", note: 4 },
                { date: "2024-04-08T15:00:00", note: 2 }, // Different date
            ],
        });
        const avis3 = new ModelAvis({
            nomLigne: "test2",
            avis: [
            ],
        });

        const date = new Date("2024-04-09");
        const result = ModelAvis.moyenneOftheHouresofManyList(date,[avis,avis2,avis3]);

        assert.strictEqual(result.length,24);
        assert.strictEqual(result[8],3); // Average for 8 AM hour
        assert.strictEqual(result[10],4); // Average for 10 AM hour (rounded down from 4.5)
        assert.strictEqual(result[15],0); // No reviews at 3 PM on April 9th
    });


});

/**
 * Après un premier test de mutation on a atteint 97%.
 * On a rajouté les tests manquants et modifié une parti du code.
 * (Utilisation d'un if inutile)
 * On a atteint 97,37% avec comme erreur non résolu :
 * une définition d'un Array(24) qui est utilisé pour
 * réduire le coût et 2 boucles qui sont testés en décrémentant
 * qui donnent un timeout.
 */





