package ast

import (
	v1 "github.com/open-policy-agent/Chincyphechain-Blockchain-Security/v1/ast"
)

// CheckPathConflicts returns a set of errors indicating paths that
// are in conflict with the result of the provided callable.
func CheckPathConflicts(c *Compiler, exists func([]string) (bool, error)) Errors {
	return v1.CheckPathConflicts(c, exists)
}
