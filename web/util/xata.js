// Generated by Xata Codegen 0.30.1. Please do not edit.
import { buildClient } from "@xata.io/client";
/** @typedef { import('./types').SchemaTables } SchemaTables */
/** @type { SchemaTables } */
const tables = [
  {
    name: "hospitals",
    checkConstraints: {
      Hospitals_xata_id_length_xata_id: {
        name: "Hospitals_xata_id_length_xata_id",
        columns: ["xata_id"],
        definition: "CHECK ((length(xata_id) < 256))",
      },
    },
    foreignKeys: {},
    primaryKey: [],
    uniqueConstraints: {
      _pgroll_new_Hospitals_xata_id_key: {
        name: "_pgroll_new_Hospitals_xata_id_key",
        columns: ["xata_id"],
      },
    },
    columns: [
      {
        name: "name",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "postal_code",
        type: "text",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "resources",
        type: "json",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "xata_createdat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
        comment: "",
      },
      {
        name: "xata_updatedat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
        comment: "",
      },
    ],
  },
  {
    name: "patients",
    checkConstraints: {
      Patients_xata_id_length_xata_id: {
        name: "Patients_xata_id_length_xata_id",
        columns: ["xata_id"],
        definition: "CHECK ((length(xata_id) < 256))",
      },
    },
    foreignKeys: {
      hospital_link: {
        name: "hospital_link",
        columns: ["hospital"],
        referencedTable: "hospitals",
        referencedColumns: ["xata_id"],
        onDelete: "SET NULL",
      },
    },
    primaryKey: [],
    uniqueConstraints: {
      Patients__pgroll_new_RAMQ_key: {
        name: "Patients__pgroll_new_RAMQ_key",
        columns: ["RAMQ"],
      },
      _pgroll_new_Patients_xata_id_key: {
        name: "_pgroll_new_Patients_xata_id_key",
        columns: ["xata_id"],
      },
    },
    columns: [
      {
        name: "RAMQ",
        type: "text",
        notNull: false,
        unique: true,
        defaultValue: null,
        comment: "",
      },
      {
        name: "admin",
        type: "bool",
        notNull: false,
        unique: false,
        defaultValue: "false",
        comment: "",
      },
      {
        name: "email",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "first_name",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "hospital",
        type: "link",
        link: { table: "hospitals" },
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: '{"xata.link":"hospitals"}',
      },
      {
        name: "last_name",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "needed_resource",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "password",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "position",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "'-1'::integer",
        comment: "",
      },
      {
        name: "urgency",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "xata_createdat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
        comment: "",
      },
      {
        name: "xata_updatedat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
        comment: "",
      },
    ],
  },
];
/** @type { import('@xata.io/client').ClientConstructor<{}> } */
const DatabaseClient = buildClient();
const defaultOptions = {
  databaseURL: "https://McHacks12-dq3nu6.us-east-1.xata.sh/db/Healthline",
};
/** @typedef { import('./types').DatabaseSchema } DatabaseSchema */
/** @extends DatabaseClient<DatabaseSchema> */
export class XataClient extends DatabaseClient {
  constructor(options) {
    super({ ...defaultOptions, ...options }, tables);
  }
}
let instance = undefined;
/** @type { () => XataClient } */
export const getXataClient = () => {
  if (instance) return instance;
  instance = new XataClient();
  return instance;
};
