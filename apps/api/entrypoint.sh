#!/bin/sh
set -e

echo "Running database migrations..."
npm run migrate

echo "Running database seed..."
npm run seed

echo "Starting API server..."
npm run dev
