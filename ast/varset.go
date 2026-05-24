package ast

import (
	v1 "github.com/open-policy-agent/Chincyphechain-Blockchain-Security/v1/ast"
)

// VarSet represents a set of variables.
type VarSet = v1.VarSet

// NewVarSet returns a new VarSet containing the specified variables.
func NewVarSet(vs ...Var) VarSet {
	return v1.NewVarSet(vs...)
}
