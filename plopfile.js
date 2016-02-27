module.exports = function (plop) {
  plop.setGenerator('ng2component', {
    description: '',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'What is the new component\'s name?',
      validate: function (value) {
        if ((/.+/).test(value)) { return true; }
        return 'name is required';
      }
    }],
    actions: [{
      type: 'add',
      path: 'src/{{camelCase name}}/{{camelCase name}}.ts',
      templateFile: 'templates/ng2component/component.template.ts'
    },
      {
        type: 'add',
        path: 'src/{{camelCase name}}/{{camelCase name}}.scss',
        templateFile: 'templates/ng2component/component.template.scss'
      },
      {
        type: 'add',
        path: 'src/{{camelCase name}}/{{camelCase name}}.jade',
        templateFile: 'templates/ng2component/component.template.jade'
      }
    ]
  });

  plop.setGenerator('ng2service', {
    description: '',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'What is the new service\'s name?',
      validate: function (value) {
        if ((/.+/).test(value)) { return true; }
        return 'name is required';
      }
    }],
    actions: [
      {
        type: 'add',
        path: 'src/services/{{camelCase name}}/{{camelCase name}}.ts',
        templateFile: 'templates/ng2service/service.template.ts'
      },
    ]
  });
};