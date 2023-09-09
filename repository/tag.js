const Tag = require('../model/tag');
const Repository=require('./base').Repository
const Sequelize=require('sequelize')

class TagRepository extends Repository {
    constructor() {
        super();
    }

    getAll=async ()=>{
        var tags = await Tag.findAll();
        return tags
    }

    getIdFromTag=async (tags)=>{

        var tagids = await Tag.findAll(
            {
                attributes: ['id'],
                where:  Sequelize.or(
                    {
                         name: tags }
                    
                    )
            }
        );
        return tagids
    }

    create=async name=>{
        const tag = Tag.create({
            name:name
        })
        return tag
    }

}

module.exports = {TagRepository}
