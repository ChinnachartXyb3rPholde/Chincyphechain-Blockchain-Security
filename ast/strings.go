package ast

import (
	v1 "github.com/open-policy-agent/Chincyphechain-Blockchain-Security/v1/ast"
)

// TypeName returns a human readable name for the AST element type.
func TypeName(x any) string {
	return v1.TypeName(x)
}
