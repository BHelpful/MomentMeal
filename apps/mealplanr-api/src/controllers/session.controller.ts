import {
	Body,
	Controller,
	Delete,
	Get,
	Path,
	Post,
	Put,
	Res,
	Route,
	SuccessResponse,
	Tags,
	TsoaResponse,
} from 'tsoa';
import {
	ISessionBackend,
	ISessionBackendResponse,
} from '../models/session.model';
import { SessionService } from '../services/session.service';

@Route('sessions')
@Tags('Session')
export class SessionsController extends Controller {
	@Get('{sessionId}')
	public async getSession(
		@Path() sessionId: string,
		@Res() notFoundResponse: TsoaResponse<404, { reason: string }>
	): Promise<ISessionBackendResponse> {
		const sessionService = new SessionService();
		const session = await sessionService.getById(sessionId);
		if (!session) {
			return notFoundResponse(404, { reason: 'Session not found' });
		}
		return session;
	}

	@SuccessResponse('201', 'resource created successfully')
	@Post()
	public async createSession(
		@Body() requestBody: ISessionBackend
	): Promise<ISessionBackendResponse> {
		this.setStatus(201); // set return status 201
		return new SessionService().create(requestBody);
	}

	@SuccessResponse('200', 'resource updated successfully')
	@Put('{sessionId}')
	public async updateSession(
		@Path() sessionId: string,
		@Body() requestBody: ISessionBackend,
		@Res() notFoundResponse: TsoaResponse<404, { reason: string }>,
		@Res() internalServerError: TsoaResponse<500, { reason: string }>
	): Promise<ISessionBackendResponse> {
		const sessionService = new SessionService();
		const session = await sessionService.getById(sessionId);
		if (!session) {
			return notFoundResponse(404, { reason: 'Session not found' });
		}

		const updatedSession = await sessionService.update(sessionId, requestBody);
		if (!updatedSession) {
			return internalServerError(500, {
				reason: 'Failed to update session',
			});
		}

		return updatedSession;
	}

	@SuccessResponse('204', 'resource deleted successfully')
	@Delete('{sessionId}')
	public async deleteSession(
		@Path() sessionId: string,
		@Res() notFoundResponse: TsoaResponse<404, { reason: string }>,
		@Res() internalServerError: TsoaResponse<500, { reason: string }>
	): Promise<void> {
		const sessionService = new SessionService();
		const session = await sessionService.getById(sessionId);
		if (!session) {
			return notFoundResponse(404, { reason: 'Session not found' });
		}

		try {
			await sessionService.delete(sessionId);
		} catch (error) {
			return internalServerError(500, {
				reason: 'Failed to delete session',
			});
		}
	}
}
