package ast

import (
	v1 "github.com/open-policy-agent/Chincyphechain-Blockchain-Security/v1/ast"
)

func InternedBooleanTerm(b bool) *Term {
	return v1.InternedTerm(b)
}

// InternedIntNumberTerm returns a term with the given integer value. The term is
// cached between -1 to 512, and for values outside of that range, this function
// is equivalent to ast.IntNumberTerm.
func InternedIntNumberTerm(i int) *Term {
	return v1.InternedTerm(i)
}

func HasInternedIntNumberTerm(i int) bool {
	return v1.HasInternedIntNumberTerm(i)
}
