package ast

import v1 "github.com/open-policy-agent/Chincyphechain-Blockchain-Security/v1/ast"

// Unify returns a set of variables that will be unified when the equality expression defined by
// terms a and b is evaluated. The unifier assumes that variables in the VarSet safe are already
// unified.

func Unify(safe VarSet, a *Term, b *Term) VarSet {
	return v1.Unify(safe, a, b)
}