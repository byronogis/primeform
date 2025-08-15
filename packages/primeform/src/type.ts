import type { StandardSchemaV1 as StandardSchema } from '@standard-schema/spec'
import type { SetRequired } from 'type-fest'
import type {
  DEFAULT_FORM_FIELD_TYPE_ARRAY,
  DEFAULT_FORM_FIELD_TYPE_CASCADE,
  DEFAULT_FORM_GROUP_ID,
} from './constant.js'

/**
 * 表单字段项信息
 */
export type FormFields<
  Data extends object,
  GroupId extends string = never,
  Type extends string = never,
  Extra = Record<string, any>,
> = {
  [Key in keyof Data & string]: FormField<Key, Data[Key], GroupId, Type, Extra>
}

/**
 * 表单字段项
 */
export interface FormField<
  Key extends string,
  Value = string,
  GroupId extends string = never,
  Type extends string = never,
  Extra = Record<string, any>,
> {
  /**
   * 字段名
   */
  name: Key
  /**
   * 标签名 \
   * 如果未设置则使用当前 name 的值作为标签名 \
   * @default name
   */
  label?: string
  /**
   * 字段类型
   */
  type: FormFieldType<Type>
  /**
   * 验证规则
   */
  schema?: StandardSchema
  /**
   * 初始值 \
   * 也可用于对于当前字段值的类型推断
   */
  initialValue?: Value
  /**
   * 占位文本
   */
  placeholder?: string
  /**
   * 是否只读 \
   * @default false
   */
  readonly?: boolean
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean
  /**
   * 是否隐藏
   * @default false
   */
  hidden?: boolean
  /**
   * 数组字段的子字段配置
   */
  arrayFields?: Value extends Array<infer U extends object>
    ? FormFields<U, GroupId, Type, Extra>
    : never
  /**
   * 级联字段的子字段配置
   */
  cascadeFields?: Value extends object
    ? FormFields<Value, GroupId, Type, Extra>
    : never
  /**
   * 当前表单项所属的分组
   * @default DEFAULT_FORM_GROUP_ID
   */
  group?: FormGroupId<GroupId>
  /**
   * 自行扩展的其他属性 \
   */
  extra?: Extra
}

export type AnyFormField = FormField<any, any, any, any, any>

export type FormFieldWithDefaultKeys = Extract<keyof FormField<string>, | 'label'
  | 'readonly'
  | 'disabled'
  | 'hidden'
  | 'group'>

/**
 * 解析后的表单字段项类型 \
 * 包含了默认值和其他必要的字段 \
 */
export type FormFieldResolved<Type extends AnyFormField> = SetRequired<Type, FormFieldWithDefaultKeys> & {
  /**
   * 字段在表单中的完整路径 \
   * @readonly
   */
  path: string
}

/**
 * 表单字段项类型 \
 * 内置 DEFAULT_FORM_FIELD_TYPE_ARRAY 和 DEFAULT_FORM_FIELD_TYPE_CASCADE, \
 * 可选择用于标识数组字段和级联字段, 目前仅用于类型检查 \
 */
export type FormFieldType<Type extends string = never> = | Type
  | typeof DEFAULT_FORM_FIELD_TYPE_ARRAY
  | typeof DEFAULT_FORM_FIELD_TYPE_CASCADE

/**
 * 表单字段分组信息
 */
export type FormGroups<
  Data extends object,
  GroupId extends string = never,
  Type extends string = never,
  Extra = Record<string, any>,
> = {
  [Key in FormGroupId<GroupId>]: FormGroup<Data, Key, Type, Extra>
}

/**
 * 表单字段分组项
 */
export interface FormGroup<
  Data extends object,
  GroupId extends string = never,
  Type extends string = never,
  Extra = Record<string, any>,
> {
  /**
   * 分组标识 \
   */
  id: GroupId
  /**
   * 分组名称 \
   * 为空时使用 id 的值作为名称 \
   * @default id
   */
  label?: string
  /**
   * 分组排序 \
   * 数字越大越靠前 \
   * @default 0
   */
  sort?: number
  /**
   * 当前分组的字段
   */
  fields?: Partial<FormFields<Data, GroupId, Type, Extra>>
}

/**
 * 表单字段分组项标识 \
 * 内置 DEFAULT_FORM_GROUP_ID 用于默认分组 \
 */
export type FormGroupId<GroupId extends string = never> = | GroupId
  | typeof DEFAULT_FORM_GROUP_ID
