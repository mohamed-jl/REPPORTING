export interface Report {
    id_report: number;
    name_rep: string;
    title: string;
    seristitle: string | null;
    chart_type: string;
    lenght_data: number;
    length_of_y: number;
    rapport: {
      id: number;
      issimplepie: boolean;
      ispercent: boolean;
      percent: number | null;
      chartType: string;
      name: string;
      seriessubtitle: string | null;
      isDetails: boolean;
      type_flow: string | null;
      title: string;
      fieldRepport_merge: string | null;
      operetionFieldMerge: string | null;
      table_join: string | null;
      col1: string | null;
      col2: string | null;
      iscustomise: boolean;
      groupeByfield: string | null;
      repRapportsXs: any;
      guiUser: any;
      function: string | null;
      limited: boolean;
      customisefiltrefeport: string | null;
      joinTable: boolean;
      fieldMerge: boolean;
      limitNumber: number | null;
      groupedBy: boolean;
    };
    pathimage: string | null;
    listnamerep: string[];
    listnamereptab: string[];
    list_de_donnees: (string | number)[][];
  }
  