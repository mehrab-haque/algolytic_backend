const Tag = require('../model/tag');
const Repository=require('./base').Repository

class TagRepository extends Repository {
    constructor() {
        super();
    }

    getAll=async ()=>{
        var tags = await Tag.findAll();
        return tags
    }

    create=async name=>{
        const tag = Tag.create({
            name:name
        })
        return tag
    }

}

module.exports = {TagRepository}
