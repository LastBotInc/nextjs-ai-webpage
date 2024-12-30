const { tavily } = require('@tavily/core');
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();

const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

if (!TAVILY_API_KEY) {
  console.error(chalk.red('Error: TAVILY_API_KEY is required in .env file'));
  process.exit(1);
}

const client = tavily({ apiKey: TAVILY_API_KEY });

interface SearchResult {
  title: string;
  url: string;
  content: string;
  score: number;
}

interface SearchResponse {
  query: string;
  results: SearchResult[];
  answer?: string;
  responseTime: number;
}

async function search() {
  const argv = await yargs(hideBin(process.argv))
    .option('query', {
      alias: 'q',
      type: 'string',
      description: 'Search query',
      demandOption: true
    })
    .option('type', {
      alias: 't',
      type: 'string',
      description: 'Search type (search, context, or qna)',
      choices: ['search', 'context', 'qna'],
      default: 'search'
    })
    .option('depth', {
      alias: 'd',
      type: 'string',
      description: 'Search depth (basic or advanced)',
      choices: ['basic', 'advanced'],
      default: 'basic'
    })
    .option('max-results', {
      alias: 'm',
      type: 'number',
      description: 'Maximum number of results',
      default: 5
    })
    .option('include', {
      alias: 'i',
      type: 'array',
      description: 'Domains to include (comma-separated)',
    })
    .option('exclude', {
      alias: 'e',
      type: 'array',
      description: 'Domains to exclude (comma-separated)',
    })
    .help()
    .argv;

  try {
    let response;
    const options = {
      searchDepth: argv.depth,
      maxResults: argv['max-results'],
      includeDomains: argv.include,
      excludeDomains: argv.exclude,
    };

    switch (argv.type) {
      case 'context':
        response = await client.searchContext(argv.query, options);
        console.log(chalk.green('\nContext Results:\n'));
        console.log(response);
        break;

      case 'qna':
        response = await client.searchQNA(argv.query, options);
        console.log(chalk.green('\nAnswer:\n'));
        console.log(response);
        break;

      default:
        response = await client.search(argv.query, options) as SearchResponse;
        console.log(chalk.green('\nSearch Results:\n'));
        console.log(chalk.gray(`Response time: ${response.responseTime}s\n`));

        response.results.forEach((result: SearchResult, index: number) => {
          console.log(chalk.blue(`\n${index + 1}. ${result.title}`));
          console.log(chalk.gray(`${result.url} (Score: ${result.score})`));
          console.log(result.content);
        });

        if (response.answer) {
          console.log(chalk.yellow('\nAnalysis:'));
          console.log(response.answer);
        }
    }

  } catch (error) {
    console.error(chalk.red('Error performing search:'), error);
    process.exit(1);
  }
}

search();
