import Storage from "../model/storage.js";

const storageController = {
    //[GET] /storage/get
    getStorage: (req, res, next) => {
        Storage.find()
            .then((data) => {
                res.status(200).json(data);
            })
            .catch(() => {
                res.status(404).json("Error!!!");
            })
    },

    //[POST] /storage/create/store
    store: (req, res, next) => {
        console.log(req.body);
        const data = new Storage(req.body);
        data.save()
            .then(() => {
                res.status(200).json(data);
            })
            .catch(() => {
                res.status(404).json("Error!!!");
            }) 
    },

    //[POST] /storage/delete/:id
    delete: (req, res, next) => {
        Storage.deleteOne({refreshToken: req.params.id})
            .then((data) => {
                res.status(200).json(data);
            })
            .catch(next) 
    }
}

export default storageController;