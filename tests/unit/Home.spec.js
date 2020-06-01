import { mount } from '@vue/test-utils';
import Home from '@/views/Home.vue';

describe('Home', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Home);
  });

  it('Should show built with modal when show-modal-button is clicked', async () => {
    expect(wrapper.find('[data-testid="built-with-modal"]').element).toBeFalsy();
    await wrapper.find('[data-testid="show-modal-button"]').trigger('click');
    expect(wrapper.find('[data-testid="built-with-modal"]').element).toBeTruthy();
  });
});
