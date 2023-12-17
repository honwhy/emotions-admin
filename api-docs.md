---
title: 个人项目 v1.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.17"

---

# 个人项目

> v1.0.0

Base URLs:

# Authentication

# experience

## POST 业务方展示

POST /business/getContent

> Body 请求参数

```json
{
  "module": "hsh",
  "content": "1"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "string",
  "result": [
    "string"
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» result|[string]|true|none||none|

## POST 获取用户列表

POST /business/pushContent

> Body 请求参数

```json
{
  "module": "hsh",
  "content": "1"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "string",
  "result": [
    "string"
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» result|[string]|true|none||none|

## POST 测试问答

POST /test_qa

> Body 请求参数

```json
{
  "content": "1"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» content|body|string| 是 |none|

> 返回示例

> 成功

```json
{
  "code": 200,
  "message": "success",
  "result": {
    "score": 1,
    "summary": "哈哈哈"
  }
}
```

```json
{
  "code": 200,
  "message": "success",
  "result": {
    "score": 1,
    "summary": "哈哈哈"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» result|object|true|none||none|
|»» score|integer|true|none||none|
|»» summary|string|true|none||none|

## POST 获取每一条问答记录

POST /experience/getContent/each

> Body 请求参数

```json
{
  "module": "hsh",
  "content": "1"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "string",
  "result": [
    {
      "record_id": 0,
      "user_id": "string",
      "flow_path": "string",
      "scene": "string",
      "content": "string",
      "create_time": 0,
      "score": 0,
      "summary": "string"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» result|[object]|true|none||none|
|»» record_id|integer|true|none||none|
|»» user_id|string|true|none||none|
|»» flow_path|string|true|none||none|
|»» scene|string|true|none||none|
|»» content|string|true|none||none|
|»» create_time|number|true|none||none|
|»» score|integer|true|none||none|
|»» summary|string|true|none||none|

## POST 获取综合结果

POST /experience/getContent

> Body 请求参数

```json
{
  "module": "hsh",
  "content": "1"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|

> 返回示例

> 成功

```json
{
  "code": 200,
  "message": "success",
  "result": {
    "去支付": {
      "flow_path": "去支付",
      "avg_score": 1,
      "summary_list": [
        "哈哈哈",
        "哈哈哈"
      ]
    }
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» result|object|true|none||none|
|»» 去支付|object|true|none||none|
|»»» flow_path|string|true|none||none|
|»»» avg_score|integer|true|none||none|
|»»» summary_list|[string]|true|none||none|

# 数据模型

