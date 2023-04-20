class casier {
    constructor (id, etat, heureD, heureF) {
        this.id=id;
        this.etat=etat;
        this.heureD=heureD;
        this.heureF=heureF;
    }
    toString(){
        return this.id + ',' + this.etat + ',' + this.heureD +',' + this.heureF;
    }
}

const casierConverter = {
    toFirestore: (casier) => {
        return {
            id : casier.id,
            etat : casier.etat,
            heureD : casier.heureD,
            heureF : casier.heureF
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new casier(data.id, data.etat, data.heureD, data.heureF);
    }
};

export default casier;
