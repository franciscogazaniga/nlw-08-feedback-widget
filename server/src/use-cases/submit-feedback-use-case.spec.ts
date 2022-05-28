import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"


const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
    it('should be able to submit feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64 asdadasd'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMailSpy).toHaveBeenCalled()
    })

    it('should not be able to submit feedback withouth type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64 test.jpg'
        })).rejects.toThrow();
    })

    it('should not be able to submit feedback withouth comment', async () => {
        await expect(submitFeedback.execute({
            type: 'IDEIA',
            comment: '',
            screenshot: 'data:image/png;base64 test.jpg'
        })).rejects.toThrow();
    })

    it('should not be able to submit feedback with an invalid screenshot format', async () => {
        await expect(submitFeedback.execute({
            type: 'IDEIA',
            comment: 'test',
            screenshot: 'test.jpg'
        })).rejects.toThrow();
    })
})