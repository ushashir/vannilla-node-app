const input = require("../lib/model");
const Util = require("../lib/utils");
import { IncomingMessage, ServerResponse } from "http";

/**
 * @readAllCompanies - This function is used to get all the companies
 * @param req - Incoming request
 * @param res - Outgoing response
 * @returns - Returns the list of companies
 * @author - Obed
 */
async function readAllCompanies(req: IncomingMessage, res: ServerResponse) {
  try {
    const org = await input.findAllCompanies();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(org));
  } catch (error) {
    res.end(JSON.stringify({ error }));
  }
}

/**
 * @readSingleCompany - This function is used to get a single company from the list companies in database
 * @param req - Incoming request
 * @param res - Outgoing response
 * @returns - Returns  only one company
 * @author - Obed
 */
async function readSingleCompany(
  req: IncomingMessage,
  res: ServerResponse,
  id: number
) {
  try {
    const single_org = await input.findOneCompany(id);
    if (!single_org) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "company not found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(single_org));
    }
  } catch (error) {
    res.end(JSON.stringify({ error }));
  }
}

/**
 * @createCompany - This function is used to create new company
 * @param req - Incoming request
 * @param res - Outgoing response
 * @returns - Returns the company created and update database
 * @author - Obed
 */
async function createCompany(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await Util.getPostData(req);

    const bodyData = JSON.parse(body);
    const new_org = {
      organization: bodyData.organization,
      createdAt:
        new Date().toDateString() + " " + new Date().toLocaleTimeString(),
      updatedAt:
        new Date().toDateString() + " " + new Date().toLocaleTimeString(),
      products: bodyData.products,
      marketValue: bodyData.marketValue,
      address: bodyData.address,
      ceo: bodyData.ceo,
      country: bodyData.country,
      id: bodyData.id,
      noOfEmployees: bodyData.noOfEmployees,
      employees: bodyData.employees,
    };
    const newOrg = await input.createCompany(new_org);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: `Company with id '${newOrg.id}' created`,
      })
    );
  } catch (error) {
    console.log("Sorry no company is with this ID", error);
  }
}

/**
 * @createCompany - This function is used to update selected company by id
 * @param req - Incoming request
 * @param res - Outgoing response
 * @returns - Returns the company updated and update database
 * @author - Obed
 */

async function editCompany(
  req: IncomingMessage,
  res: ServerResponse,
  id: number
) {
  try {
    const single_org = await input.findOneCompany(id);

    if (!single_org) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Organization not found" }));
    } else {
      const bodyData = JSON.parse(await Util.getPostData(req));

      const update_org = {
        organization: bodyData.organization || single_org.organization,
        createdAt: single_org.createdAt,
        updatedAt: new Date().toISOString() || single_org.updatedAt,
        products: bodyData.products || single_org.products,
        marketValue: bodyData.marketValue || single_org.marketValue,
        address: bodyData.address || single_org.address,
        ceo: bodyData.ceo || single_org.ceo,
        country: bodyData.country || single_org.country,
        id: bodyData.id || single_org.id,
        noOfEmployees: bodyData.noOfEmployees || single_org.noOfEmployees,
        employees: bodyData.employees || single_org.employees,
      };
      await input.editCompany(id, update_org);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: `Company with id '${id}' updated successfully`,
        })
      );
    }
  } catch (error) {
    res.end(JSON.stringify({ error }));
  }
}

/**
 * @createCompany - This function is used to delete selected company
 * @param req - Incoming request
 * @param res - Outgoing response
 * @returns - delete the company selected and update database
 * @author - Obed
 */

async function deleteCompany(
  req: IncomingMessage,
  res: ServerResponse,
  id: number
) {
  try {
    const single_org = await input.findOneCompany(id);

    if (!single_org) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Organization not found" }));
    } else {
      await input.deleteCompany(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: `Organization with id '${id}' deleted successfully`,
        })
      );
    }
  } catch (error) {
    res.end(JSON.stringify({ error }));
  }
}

// Export all functions
module.exports = {
  readAllCompanies,
  readSingleCompany,
  createCompany,
  editCompany,
  deleteCompany,
};
