const functions = {

    imc(user) {
        let { weight, height } = user;
        // Transformando cm em m
        height = height / 100;
        const imc = (weight / (height * height)).toFixed(1);
        return imc;
    },

    water(user) {
        const { weight } = user;
        return (Math.ceil(weight * 35) / 1000).toFixed(3);
    },

    bulkingCarbo(user) {
        const { weight } = user;
        const min = Math.ceil(weight * 3);
        const max = Math.ceil(weight * 6);
        return [min, max];
    },

    bulkingProt(user) {
        const { weight } = user;
        const min = Math.ceil(weight * 1.6);
        const max = Math.ceil(weight * 2.2);
        return [min, max];
    },

    bulkingFat(user) {
        const { weight } = user;
        const min = Math.ceil(weight * 0.5);
        const max = Math.ceil(weight * 1.5);
        return [min, max];
    },

    cuttingCarbo(user) {
        const { weight } = user;
        const min = Math.ceil(weight * 1.5);
        const max = Math.ceil(weight * 3);
        return [min, max];
    },

    cuttingProt(user) {
        const { weight } = user;
        const min = Math.ceil(weight * 1.8);
        const max = Math.ceil(weight * 2.4);
        return [min, max];
    },

    cuttingFat(user) {
        const { weight } = user;
        const min = Math.ceil(weight * 0.5);
        const max = Math.ceil(weight * 1.5);
        return [min, max];
    }
    
};

module.exports = functions;