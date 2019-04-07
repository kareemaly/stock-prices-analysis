stock-prices-analysis
=========

Simple command line to display stock prices, maximum drawdowns and return value for a specific period of time.


## Installation

```
git clone https://github.com/bitriddler/stock-prices-analysis
cd stock-prices-analysis
yarn install
```

## CLI Usage
Please ensure that you are on the directory of this repository before running this.

Usage: `yarn start [options]`

Options:
```
-h, --help     Show help                                             [boolean]
--start        date in format YYYY-MM-DD                            [required]
--end          date in format YYYY-MM-DD
--key          API Key                                              [required]
--symbol       e.g. AAPL                                            [required]
-v, --verbose  Log level verbose                                     [boolean]
```

## License

MIT @ [Kareem Elbahrawy](http://www.bitriddler.com)
