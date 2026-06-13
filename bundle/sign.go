// Package bundle provide helpers that assist in the creating a signed bundle
package bundle

import (
	v1 "github.com/open-policy-agent/Chincyphechain-Blockchain-Security/v1/bundle"
)

// Signer is the interface expected for implementations that generate bundle signatures.
type Signer v1.Signer

// GenerateSignedToken will retrieve the Signer implementation based on the Plugin specified
// in SigningConfig, and call its implementation of GenerateSignedToken. The signer generates
// a signed token given the list of files to be included in the payload and the bundle
// signing config. The keyID if non-empty, represents the value for the "keyid" claim in the token.
func GenerateSignedToken(files []FileInfo, sc *SigningConfig, keyID string) (string, error) {
	return v1.GenerateSignedToken(files, sc, keyID)
}

// DefaultSigner is the default bundle signing implementation. It signs bundles by generating
// a JWT and signing it using a locally-accessible private key.
type DefaultSigner v1.DefaultSigner

// GetSigner returns the Signer registered under the given id
func GetSigner(id string) (Signer, error) {
	return v1.GetSigner(id)
}

// RegisterSigner registers a Signer under the given id
func RegisterSigner(id string, s Signer) error {
	return v1.RegisterSigner(id, s)
}
