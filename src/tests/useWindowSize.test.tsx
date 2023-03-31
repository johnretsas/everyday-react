import { renderHook } from '@testing-library/react';
import { useWindowSize } from '../useWindowSize';

describe('useWindowSize', () => {
    it('should return an object with width and height properties', () => {

        const { result } = renderHook(() => useWindowSize());
        expect(result.current).toHaveProperty('width');
        expect(result.current).toHaveProperty('height');
    });

    it('should update windowSize when window is resized', () => {
        const { result } = renderHook(() => useWindowSize());
        // Change window size
        window.innerWidth = 1024;
        window.innerHeight = 768;
        window.dispatchEvent(new Event('resize'));
        window.dispatchEvent(new Event('resize'));

        expect(result.current.width).toEqual(1024);
        expect(result.current.height).toEqual(768);
    });

    it('should remove event listener on cleanup', () => {
        const removeEventListener = jest.spyOn(window, 'removeEventListener');
        const { unmount } = renderHook(() => useWindowSize());
        unmount();
        expect(removeEventListener).toHaveBeenCalled();
    });
});
