

const Model = require(process.cwd() + "\\lib\\Model\\model.js");

const tableName = "example"; 
const Sequelize = require('sequelize'); 

class Example extends Model{
    constructor(config){
        super(config)
    }
    initTable(){
        this.model = this.sequelize.define(tableName, {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            numeroSerie: {
                type: Sequelize.STRING(255),
                allowNull: false
            }
        }, {
            tableName: tableName + "s",
            timestamps: true,
            underscored: true
        })

        this.model.sync({ alter: true }).then(() => {})
    }
    insertData(data){
        return this.model.create(data);
    }
    findWhere(key, value, callback){
        this.retrieveOneByProp(this.model, key, value)
        .then(object => {
            callback(object)
        }).catch((err) => {
           
        })
    }
}

module.exports = Example;