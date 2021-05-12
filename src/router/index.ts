import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
export const prefix = "Timo's Photos | ";

const router = new VueRouter({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  mode: 'history',

  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/folder/:id/edit',
      name: 'edit-folder',
      component: () => import('@/views/folder/EditFolder.vue'),
      meta: {
        title: 'Edit Folder',
        fullscreen: true,
      },
    },
    {
      path: '/folder/create',
      name: 'create-folder',
      component: () => import('@/views/folder/CreateFolder.vue'),
      meta: {
        title: 'Create Folder',
        fullscreen: true,
      },
    },
    {
      path: '/folder/:id',
      name: 'folder',
      component: () => import('@/views/folder/Folder.vue'),
      meta: {
        title: 'Folder',
      },
    },
    {
      path: '/file/:id/edit',
      name: 'edit-file',
      component: () => import('@/views/file/EditFile.vue'),
      meta: {
        title: 'Edit File',
        fullscreen: true,
      },
    },
    {
      path: '/file/:id',
      name: 'file',
      component: () => import('@/views/file/File.vue'),
      meta: {
        title: 'File',
      },
    },
    {
      path: '*',
      redirect: { name: 'home' },
    },

    {
      path: '',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        title: 'Login',
        fullscreen: true,
      },
    },
  ],
});

export default router;
