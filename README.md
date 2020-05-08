# B2B Product Wizard

Create and update a B2B product with ease using this Lightning component.

### Prerequisites

You must have B2B Commerce 4.9 (3.136) or higher installed.

When using this component, you must have CRUD/FLS access to the following objects (and their fields):

* CC Product
* CC Price List Item
* CC Product Media
* CC Product Category
* CC Product Spec
* CC Spec
* CC Related Product

You also must have read access to the following objects (and their fields):

* CC Configuration
* CC Price List
* CC Category

## Installation

Install the managed package from the AppExchange using this URL:

https://login.salesforce.com/packaging/installPackage.apexp?p0=04t6g000008GBbfAAG

To install the source in this repo, clone the repo, then issue this command in the Salesforce CLI:

    sfdx force:source:deploy -x manifest/package.xml -u [targetusername]

Or, if you have the Salesforce Extension Pack installed, right-click on the manifest/package.xml file and select 

    SDFX: Deploy Source in Manifest to Org

This will deploy the source to whatever org you have associated with your SF DX project as the user org.

## Usage

Add the B2B Commerce Product Wizard component to the CC Product record page, or any stand-alone Lightning page.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

* 1.0.2
    * Initial release

## Authors

* **Michael Sobczak** - *Initial work* - [Salesforce.com](https://salesforce.com)

## License

This project is licensed under the BSD 3-Clause - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Brandon Rogers
* Jessica McConoghy
* Tana Babcock
* Samuel Check
* Dinesh Gajwani
* Tim Siukola
* Jason Illg