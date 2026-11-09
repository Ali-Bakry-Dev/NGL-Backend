import requestService from "./request.service.js";

import {
createRequestDTO,
respondToRequestDTO,
getRequestDTO
} from "./request.dto.js";

import { validateBody } from "../../lib/validation/validation.js";

class RequestController {
async createRequest(req, res, next) {
try {
const { body } = validateBody(createRequestDTO, {
body: req.body
});

        const request = await requestService.createRequest({
            message: body.message,
            requester: req.user.id
        });

        return res.status(201).json({
            success: true,
            message: "Request created successfully",
            data: request
        });
    } catch (error) {
        next(error);
    }
}

async getRequest(req, res, next) {
    try {
        const { params } = validateBody(getRequestDTO, {
            params: req.params
        });

        const request = await requestService.getRequest(
            params.requestId,
            req.user.id
        );

        return res.status(200).json({
            success: true,
            data: request
        });
    } catch (error) {
        next(error);
    }
}

async getUserRequests(req, res, next) {
    try {
        const requests = await requestService.getUserRequests(
            req.user.id
        );

        return res.status(200).json({
            success: true,
            data: requests
        });
    } catch (error) {
        next(error);
    }
}

async respondToRequest(req, res, next) {
    try {
        const { params, body } = validateBody(
            respondToRequestDTO,
            {
                params: req.params,
                body: req.body
            }
        );

        const request = await requestService.respondToRequest(
            params.requestId,
            req.user.id,
            body.status
        );

        return res.status(200).json({
            success: true,
            message: `Request ${body.status} successfully`,
            data: request
        });
    } catch (error) {
        next(error);
    }
}

}

const requestController = new RequestController();

export const createRequest = requestController.createRequest.bind(requestController);
export const getRequest = requestController.getRequest.bind(requestController);
export const getUserRequests = requestController.getUserRequests.bind(requestController);
export const respondToRequest = requestController.respondToRequest.bind(requestController);