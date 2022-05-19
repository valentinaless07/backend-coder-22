import { normalize, schema } from 'normalizr'

const authorsSchema = new schema.Entity('authors')
const msgSchema = new schema.Entity('messages', { author: authorsSchema }, { idAttribute: 'id' })

const normalizeMsg = msg => {
	const msgNormalizer = normalize(msg, [msgSchema])
	return msgNormalizer
}

export { normalizeMsg }