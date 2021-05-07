const { Pool } = require('pg')

const pool = new Pool({
	host: 'localhost',
	user: 'shirin',
	password: 'shirin',
	database: 'graph_beginner_app',
	port: 5432
})

const rows = async (SQL, ...params) => {

	const client = await pool.connect()

	try {

		const { rows } = await client.query(SQL, params)

		return rows
	}
	catch(error) {
		throw error
	}
	finally {
		client.release()
	}
}

module.exports.rows = rows