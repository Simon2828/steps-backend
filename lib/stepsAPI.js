const knex = require('knex')({ client: 'mysql' });

class StepsDataLoader {
    constructor(conn) {
        this.conn = conn;
    }

    query(sql) {
        return this.conn.query(sql);
    }

    getAllLos() {
        return this.query(
            knex.raw(`SELECT lO_name AS lO, lO_id AS lOId, GROUP_CONCAT(step_name) AS stepsToSuccess FROM lOsAndSteps GROUP BY lO_name`)
                .toString())
    }

    editLo(lO) {
        return this.query(
            knex('lOsAndSteps')
                .where('lO_id', '=', lO.databaseId)
                .update('lO_name', lO.lO)
                .select()
                .toString()
        )
    }

    editStep(step) {
        console.log('step.databaseId', step.databaseId)
        console.log('step.index', step.stepIndex);
        return this.query(
            knex('lOsAndSteps')
                .where({
                    lO_id: step.databaseId,
                    step_order: step.stepIndex    
                })
                .update('step_name', step.step)
                .select()
                .toString()
        )
    }
}

module.exports = StepsDataLoader;


