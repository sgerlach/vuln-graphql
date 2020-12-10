import {GraphQLObjectType, GraphQLString, GraphQLFieldConfig} from 'graphql'

import child_process from 'child_process';
import {promisify} from 'util';

const exec = promisify(child_process.exec);

var CommandOutputType = new GraphQLObjectType({
    name: 'CommandOutput',
    fields: {
        stdout: {
            type: GraphQLString
        },
        stderr: {
            type: GraphQLString
        }
    }
})

export var SecretMutation: GraphQLFieldConfig<any,any,any> = {
    type: CommandOutputType,
    args: {
        command: {
            type: GraphQLString
        }
    },
    resolve: async (_root: any, args: any, _info: any) => {
        let command = '';
        switch(args.command){
          case 'disk':
            command = 'df -h';
            break;
          case 'log':
            command = 'tail -15 /var/log/dpkg.log';
            break;
          default:
            command = 'echo sorry, you have to pick a command';
        }
        let results = await exec(command);
        return results;
    }
}
