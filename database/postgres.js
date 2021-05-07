const { Pool } = require('pg')

const pool = new Pool({
	host: 'localhost',
	user: 'shirin',
	password: 'shirin',
	database: 'graph_beginner_app',
	port: 5432
})

const rows = async (SQL, ...params) => {

	const c = await pool.connect()

	try {

		const { rows } = await c.query(SQL, params)

		return rows
	}
	catch(e) {
		throw e
	}
	finally {
		c.release()
	}
}

module.exports.rows = rows