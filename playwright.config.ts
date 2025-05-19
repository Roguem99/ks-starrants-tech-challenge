import { defineConfig } from '@playwright/test';
import * as dotenv from "dotenv";
import path = require("path")

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
    tsconfig: './tsconfig.json',
    testDir: 'tests',
    fullyParallel: true,
    reporter: [ 
        ['html', { open: 'never' }]
    ],
    outputDir: 'test-results',
    use: {
        baseURL: 'https://reqres.in/',
        extraHTTPHeaders: {
        'Accept': 'x-api-key: reqres-free-v1',
        'Authorization': `Bearer ${process.env.API_TOKEN}`,
        'Content-Type': 'application/json'
        },
    }
});

