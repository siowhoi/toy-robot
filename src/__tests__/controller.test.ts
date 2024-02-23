import { describe, expect, test, beforeEach, afterEach } from '@jest/globals';
import { jest } from '@jest/globals';
import Controller from '../controller';

describe('Controller test', () => {
    let stdOutSpy: jest.SpiedFunction<{
        (buffer: string | Uint8Array, cb?: ((err?: Error | undefined) => void) | undefined): boolean;
        (str: string | Uint8Array, encoding?: BufferEncoding | undefined, cb?: ((err?: Error | undefined) => void) | undefined): boolean;
    }>;
    let log = "";

    beforeEach(() => {
        stdOutSpy = jest
            .spyOn(process.stdout, "write")
            .mockImplementation((value) => {
                log = value as string;
                return true;
            });
    });

    afterEach(() => {
        process.env = {};
        stdOutSpy.mockReset();
        log = "";
    });

    test('PLACE', () => {
        const controller = new Controller();
        controller.execute("PLACE 1, 1, NORTH");
        controller.execute("REPORT");
        expect(log.trim()).toEqual("1, 1, NORTH");
    });

    test('MOVE', () => {
        const controller = new Controller();
        controller.execute("PLACE 1, 1, NORTH");
        controller.execute("MOVE");
        controller.execute("REPORT");
        expect(log.trim()).toEqual("1, 2, NORTH");
    });
});