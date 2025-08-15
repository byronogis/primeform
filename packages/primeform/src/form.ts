import type {
  FormFields,
  FormGroup,
  FormGroups,
} from './type'

export function defineForm<
  Data extends object,
  GroupId extends string = never,
  Type extends string = never,
  Extra = Record<string, any>,
>(_options: DefineFormOptions<Data, GroupId, Type, Extra>): any {
  // const {
  //   fields,
  //   groups = {},
  // } = options ?? {}

  /**
   * 解析分组信息 \
   * 1. 处理默认值 \
   */
  function _resolveGroup(rawGroup: FormGroup<Data, GroupId, Type, Extra>): Required<FormGroup<Data, GroupId, Type, Extra>> {
    return {
      label: rawGroup.label ?? rawGroup.id,
      sort: rawGroup.sort ?? 0,
      fields: rawGroup.fields ?? {},
      ...rawGroup,
    }
  }

  return {}
}

export interface DefineFormOptions<
  Data extends object,
  GroupId extends string = never,
  Type extends string = never,
  Extra = Record<string, any>,
> {
  /**
   * 表单字段信息
   */
  fields: Partial<FormFields<Data, GroupId, Type, Extra>>
  /**
   * 表单字段分组信息
   */
  groups?: Partial<FormGroups<Data, GroupId, Type, Extra>>
}

export type DefineFormReturns = ReturnType<typeof defineForm>
