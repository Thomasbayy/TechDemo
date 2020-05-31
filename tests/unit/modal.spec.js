import { mount } from '@vue/test-utils';
import Modal from '@/components/Modal.vue';

describe('Modal', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Modal, {
      propsData: {
        value: true,
        closeEverywhere: false,
      },
    });
  });

  it('should be hidden when value prop is false', async () => {
    wrapper.setProps({ value: false });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('[data-testid="backdrop"]').element).toBe(undefined);
  });

  it('should be shown if value prop is true', () => {
    expect(wrapper.find('[data-testid="backdrop"]').element).toBeTruthy();
  });

  it('should emit input false, when close button is clicked', () => {
    const button = wrapper.find('[data-testid="close-button"]');
    button.trigger('click');
    expect(wrapper.emitted().input.length).toBe(1);
  });

  it('clicking backdrop should call closeIfEverywhere', async () => {
    const spy = jest.fn();
    wrapper = mount(Modal, {
      propsData: {
        value: true,
      },
      methods: {
        closeIfEverywhere: spy,
      },
    });
    const backdrop = wrapper.find('[data-testid="backdrop"]');
    await backdrop.trigger('click');

    expect(spy).toBeCalled();
  });

  it('closeIfEverywhere should not call close, if closeEverywhere is false', () => {
    const spy = jest.spyOn(wrapper.vm, 'close');

    wrapper.vm.closeIfEverywhere();
    expect(spy).toBeCalledTimes(0);
  });

  it('closeIfEverywhere should call close, if closeEverywhere is true', () => {
    wrapper.setProps({
      closeEverywhere: true,
    });
    const spy = jest.spyOn(wrapper.vm, 'close');

    wrapper.find('[data-testid="backdrop"]').trigger('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
