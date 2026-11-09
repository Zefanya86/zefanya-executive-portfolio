import { initialPortfolioData } from '../src/data/initialData';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'portfolio.json');
fs.writeFileSync(dataFilePath, JSON.stringify(initialPortfolioData, null, 2), 'utf-8');
console.log('SUCCESS: portfolio.json synchronized with initialPortfolioData');
