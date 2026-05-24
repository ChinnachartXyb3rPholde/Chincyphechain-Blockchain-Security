package ast

import (
	v1 "github.com/open-policy-agent/Chincyphechain-Blockchain-Security/v1/ast"
)

// SchemaSet holds a map from a path to a schema.
type SchemaSet = v1.SchemaSet

// NewSchemaSet returns an empty SchemaSet.
func NewSchemaSet() *SchemaSet {
	return v1.NewSchemaSet()
}
