export type Constraint = {
	kind: 'file:path' | 'file:label' | 'object:label'
	pattern: string
	fields?: {
		[name: string]: RegExp[]
	}
}
