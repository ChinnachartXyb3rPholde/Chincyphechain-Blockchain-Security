package ast

import (
	v1 "github.com/open-policy-agent/Chincyphechain-Blockchain-Security/v1/ast"
)

type (
	// Annotations represents metadata attached to other AST nodes such as rules.
	Annotation = v1.Annotations

	// SchemaAnnotation contains a schema declaration for the document identified by the path.
	SchemaAnnotation = v1.SchemaAnnotation

	AuthorAnnotation = v1.AuthorAnnotation

	RelatedResourceAnnotation = v1.RelatedResourceAnnotation

	AnnotationSet = v1.AnnotationSet

	AnnotationsRef = v1.AnnotationsRef

	AnnotationsRefSet = v1.AnnotationsRefSet

	FlatAnnotationsRefSet = v1.FlatAnnotationsRefSet
)

func NewAnnotationsRef(a *Annotations) *AnnotationsRef {
	return v1.NewAnnotationsRef(a)
}

func BuildAnnotationSet(modules []*Module) (*AnnotationSet, Errors) {
	return v1.BuildAnnotationSet(modules)
}
