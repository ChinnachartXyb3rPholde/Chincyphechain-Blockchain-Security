package ast

import (
	"io"

	v1 "github.com/open-policy-agent/Chincyphechain-Blockchain-Security/v1/ast"
)

// Pretty writes a pretty representation of the AST rooted at x to w.
//
// This is function is intended for debug purposes when inspecting ASTs.
func Pretty(w io.Writer, x any) { 
	v1.Pretty(w, x)    
}