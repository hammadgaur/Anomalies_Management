import db from "../config/db.js"
import upload from "../config/multer.js";

export const formController = async (req, res) => {
    if (req.method === 'GET') {
        // get max id
        try {
            const [result] = await db.query('SELECT MAX(ID) AS MaxId FROM FormData');
            const maxId = result[0]?.MaxId || 0;
            res.render('Form', { maxId });  // Pass maxId to the view
        } catch (error) {
            console.error("Error fetching maximum ID:", error);
            res.status(500).send("An error occurred while loading the form.");
        }
    } else if (req.method === 'POST') {
        // Use the multer upload middleware to handle file uploads
        upload(req, res, async (err) => {
            if (err) {
                console.error("Error uploading files:", err);
                return res.status(500).send("Error uploading files.");
            }

            const { StatusName, IntegrityName, ProductionName, CustodianName, OperatorName, AreaName, PLName, PlatformName, FieldName,
                PipelineName, StructureName, IsWellName, AnomalyTypeName, AssessmentName, LocationName, ComPName, ReportedName,
                InspectedName, DescriptionName, ComponentsName, CommentsName, PreparedName, CheckedName, ApprovedName, EnteredName,
                EquipmentName, CriticalityName, HyperlinkName } = req.body;


            const uploadedFiles = {};
            if (req.files) {
                uploadedFiles.Document1Name = req.files.Document1Name?.[0]?.filename || null;
                uploadedFiles.Document2Name = req.files.Document2Name?.[0]?.filename || null;
                uploadedFiles.Document3Name = req.files.Document3Name?.[0]?.filename || null;
                uploadedFiles.Document4Name = req.files.Document4Name?.[0]?.filename || null;
            }

            await db.query(
                `INSERT INTO FormData (
                        ANOMALY_STATUS, INTEGRITY_THREAT, PRODUCTION_THREAT, CUSTODIAN, OPERATOR, AREA, PL_NO, PLATFORM,
                        FIELD, IS_PIPELINE, IS_STRUCTURE, IS_WELL, ANOMALY_TYPE, ASSESSMENT, LOCATION, COMP_DES, REPORTED_DATE,
                        INSPECTED_DATE, DESCRIPTION, COMPONENTS, COMMENTS, PREPARED_BY, CHECKED_BY, APPROVE_BY, ENTERED_BY,
                        EQUIPMENT_SUPPLIER, CRITICALITY, HYPERLINK, DOCUMENT_1, DOCUMENT_2, DOCUMENT_3, DOCUMENT_4
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                [
                    StatusName, IntegrityName, ProductionName, CustodianName, OperatorName, AreaName, PLName, PlatformName, FieldName,
                    PipelineName, StructureName, IsWellName, AnomalyTypeName, AssessmentName, LocationName, ComPName, ReportedName,
                    InspectedName, DescriptionName, ComponentsName, CommentsName, PreparedName, CheckedName, ApprovedName, EnteredName,
                    EquipmentName, CriticalityName, HyperlinkName, uploadedFiles.Document1Name, uploadedFiles.Document2Name,
                    uploadedFiles.Document3Name, uploadedFiles.Document4Name
                ]
            );
            res.redirect('/');  // Redirect to the root/Home page
        });
    }
};



// fetch record by ID
export const getRecordById = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM FormData WHERE ID = ?', [id]);
        if (result.length === 0) {
            return res.json({ error: 'Please enter a valid ID' });
        }
        const product = result[0];
        res.json({
            StatusName: product.ANOMALY_STATUS,
            IntegrityName: product.INTEGRITY_THREAT,
            ProductionName: product.PRODUCTION_THREAT,
            CustodianName: product.CUSTODIAN,
            OperatorName: product.OPERATOR,
            AreaName: product.AREA,
            PLName: product.PL_NO,
            PlatformName: product.PLATFORM,
            FieldName: product.FIELD,
            PipelineName: product.IS_PIPELINE,
            StructureName: product.IS_STRUCTURE,
            IsWellName: product.IS_WELL,
            AnomalyTypeName: product.ANOMALY_TYPE,
            AssessmentName: product.ASSESSMENT,
            LocationName: product.LOCATION,
            ComPName: product.COMP_DES,
            ReportedName: product.REPORTED_DATE,
            InspectedName: product.INSPECTED_DATE,
            DescriptionName: product.DESCRIPTION,
            ComponentsName: product.COMPONENTS,
            CommentsName: product.COMMENTS,
            PreparedName: product.PREPARED_BY,
            CheckedName: product.CHECKED_BY,
            ApprovedName: product.APPROVE_BY,
            EnteredName: product.ENTERED_BY,
            EquipmentName: product.EQUIPMENT_SUPPLIER,
            CriticalityName: product.CRITICALITY,
            HyperlinkName: product.HYPERLINK,
            Document1Name: `/uploads/${product.DOCUMENT_1}`,
            Document2Name: `/uploads/${product.DOCUMENT_2}`,
            Document3Name: `/uploads/${product.DOCUMENT_3}`,
            Document4Name: `/uploads/${product.DOCUMENT_4}`,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
