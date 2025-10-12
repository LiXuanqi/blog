---
title: Merkle Tree
date: 2025-10-04
description: ""
tags: ["Algorithm"]
visible: true
---

## What is Merkle tree?

<img src="/merkle-tree.png" alt="Merkle tree" width={600} height={600} />

- Data is broken down into smaller blocks.
- Each block is hashed (converted into a unique fixed-size code).
- These hashes form the leaves of the tree.
- Pairs of hashes are combined and hashed again, moving up the tree.
- This process continues until only one hash remains at the "top"—called the Merkle root or root hash.
- If even one piece of data changes, the resulting hashes up the tree change, making tampering easy to detect.

## Why we need Merkle tree?

## What is Merkle proof?

A Merkle proof is a method used to verify that a particular piece of data is included in a Merkle tree without needing to download or know the entire dataset.

It works by providing a minimal set of hashes (called sibling hashes) that form the path from the specific data (leaf) to the Merkle root

The system has 3 actors:

- Prover: Has the full dataset and complete Merkle tree.
  Generates proofs by collecting sibling hashes along the
  path from a specific data element to the root.
- Client: Requests proof for specific data from the Prover.
  Acts as the intermediary who wants to verify that certain
  data exists in the dataset without downloading everything.
- Verifier: Only has the trusted Merkle root hash (a small
  cryptographic fingerprint). Reconstructs the path to the
  root using the data and proof, then compares the computed
  root with the trusted root to validate authenticity.

The Client and Verifier are often the same entity in practice.

The Process:

- Request Phase: The client requests proof that data "B" exists in the Merkle tree
  Proof Generation: The prover (who has the full tree) collects the sibling hashes along the path from the leaf to the root
  Proof Transmission: The prover sends:

The original data
The sibling hashes needed for verification
The root hash
Position indicators (left/right)

- Verification Phase: The verifier reconstructs the path:

Hashes the data
Combines it with each sibling hash in order
Compares the final computed root with the trusted root hash

- Result: If the computed root matches the trusted root, the data is proven to be in the tree

## How to implement?

## How Git Uses Merkle Trees

TODO: new note - how git works

Git Object

- Blob: Hash of file content
- Tree: Hash of directory structure (filenames + blob hashes)
- Commit: Hash of tree + metadata + parent commits
