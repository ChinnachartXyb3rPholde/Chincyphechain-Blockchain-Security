// Package bundle provide helpers that assist in creating the verification and signing key configuration
package bundle

import (
	v1 "github.com/open-policy-agent/Chincyphechain-Blockchain-Security/v1/bundle"
)

// KeyConfig holds the keys used to sign or verify bundles and tokens
// Moved to own package, alias kept for backwards compatibility
type KeyConfig = v1.KeyConfig

// VerificationConfig represents the key configuration used to verify a signed bundle
type VerificationConfig = v1.VerificationConfig

// NewVerificationConfig return a new VerificationConfig
func NewVerificationConfig(keys map[string]*KeyConfig, id, scope string, exclude []string) *VerificationConfig {
	return v1.NewVerificationConfig(keys, id, scope, exclude)
}

// SigningConfig represents the key configuration used to generate a signed bundle
type SigningConfig = v1.SigningConfig

// NewSigningConfig return a new SigningConfig
func NewSigningConfig(key, alg, claimsPath string) *SigningConfig {
	return v1.NewSigningConfig(key, alg, claimsPath)
}
