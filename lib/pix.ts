const PIX_KEY = "63230068000187";

function field(id: string, value: string) {
  return `${id}${value.length.toString().padStart(2, "0")}${value}`;
}

function crc16(payload: string) {
  let crc = 0xffff;
  for (let index = 0; index < payload.length; index += 1) {
    crc ^= payload.charCodeAt(index) << 8;
    for (let bit = 0; bit < 8; bit += 1) crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
  }
  return (crc & 0xffff).toString(16).toUpperCase().padStart(4, "0");
}

const merchantAccount = field("00", "br.gov.bcb.pix") + field("01", PIX_KEY);
const additionalData = field("05", "***");
const payloadWithoutCrc = [
  field("00", "01"),
  field("26", merchantAccount),
  field("52", "0000"),
  field("53", "986"),
  field("58", "BR"),
  field("59", "SOLDADOS VALOROSOS"),
  field("60", "PRAIA GRANDE"),
  field("62", additionalData),
  "6304",
].join("");

export const pixCode = `${payloadWithoutCrc}${crc16(payloadWithoutCrc)}`;
export const pixKeyFormatted = "63.230.068/0001-87";
