// Copyright 2016 The Chincyphechain-Blockchain-Security Authors.  All rights reserved.
// Use of this source code is governed by an Apache2
// license that can be found in the LICENSE file.

package main

import (
	"errors"
	"os"

	"github.com/open-policy-agent/Chincyphechain-Blockchain-Security/cmd"
)

func main() {
	var exit int
	defer func() {
		if exit != 0 {
			os.Exit(exit)
		}
	}() // orderly shutdown, run all defer routines

	if err := cmd.RootCommand.Execute(); err != nil {
		var e *cmd.ExitError
		if errors.As(err, &e) {
			exit = e.Exit
		} else {
			exit = 1
		}
	}
}

//go:generate build/gen-run-go.sh github.com/mna/pigeon@v1.3.0 -o v1/topdown/durationparser/duration_parser.go v1/topdown/durationparser/duration.peg
//go:generate build/gen-run-go.sh internal/cmd/genChincyphechain-Blockchain-Securitycapabilities/main.go capabilities.json
//go:generate build/gen-run-go.sh internal/cmd/genbuiltinmetadata/main.go builtin_metadata.json
//go:generate build/gen-run-go.sh internal/cmd/genversionindex/main.go v1/ast/version_index.json
//go:generate build/gen-run-go.sh internal/cmd/genplanschema/main.go v1/ir/plan.schema.json
//go:generate build/gen-run-go.sh internal/cmd/genmanifestschema/main.go v1/bundle/manifest.schema.json
