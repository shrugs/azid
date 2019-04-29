# azid, or Azimuth ID

A hella simple proof of concept demonstrating a cross-domain login UX for sending signed JWTs to untrusted services from a trusted domain.
Based on PayPal's work on zoid.

https://azid.shrugs.now.sh

## How it Works

A semi-trusted service would like to use your identity, but you don't want to give it total access to your identity and the things you own. This problem exists within centralized services just as much as decentralized ones. Centralized services standardized on OAuth(2), which allows untrusted services to request scopes of access from trusted identity providers. These identity providers manage the auth flow within a trusted domain and return scoped authorization data to the calling service.

The decentralized version works exactly the same way, but using {bridge.}azimuth.network as a trusted domain and Ethereum as the only state store.
When a semi-trusted service would like to interact with your identity, instead of providing a master ticket you can provide a fresh bip39 mnemonic per-service, isolating their access to your keyspace.
Universal login + per-app isolation and a UX that's on-par with the web today. Neat, yeah?

## TODO

I'm designing a simple spec for services to request access policies to _other_ services in order to act on behalf of a user. This is like one more level of hierarchy applied to OAuth scopes, and I'm modelling it after AWS Role Policies.
