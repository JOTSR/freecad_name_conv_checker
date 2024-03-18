export type Constraint = {
	kind: 'file:path' | 'file:label' | 'object:label'
	format: string
	fields: {
		[name: string]: RegExp[]
	}
}
