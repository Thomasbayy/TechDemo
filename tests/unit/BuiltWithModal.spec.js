import { mount } from '@vue/test-utils';
import BuiltWithModal from '@/components/BuiltWithModal.vue';

describe('BuiltWithModal', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(BuiltWithModal, {
      propsData: {
        value: true,
      },
    });
  });

  it('should be rendered in DOM when prop:value is true', () => {
    expect(wrapper.find('[data-testid="modal"]').element).toBeTruthy();
  });

  it('should not be rendered in DOM when prop:value is false', async () => {
    wrapper.setProps({
      value: false,
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.find('[data-testid="modal"]').element).toBeFalsy();
  });

  it('should emit input:false when input:false is called from the modal child component', () => {
    wrapper.find('[data-testid="modal"]').vm.$emit('input', false);
    expect(wrapper.emitted().input[0]).toEqual([false]);
  });
});
